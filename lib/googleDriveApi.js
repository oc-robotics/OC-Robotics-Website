/**
 * Google Drive API integration for loading images and files
 * This will fetch image data from a Google Drive folder
 */

/**
 * Fetches files from a Google Drive folder
 * @param {string} folderId - The Google Drive folder ID
 * @param {string} apiKey - The Google Drive API key
 * @param {string} mimeType - Filter by MIME type (optional, e.g., 'image/jpeg,image/png')
 * @returns {Promise<Array>} - Array of file objects
 */
export async function fetchFilesFromGoogleDrive(folderId, apiKey, mimeType = null) {
  try {
    let url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}&fields=files(id,name,mimeType,webViewLink,webContentLink,thumbnailLink,createdTime,modifiedTime,size,parents)`;
    
    // Add MIME type filter if specified
    if (mimeType) {
      const mimeTypes = mimeType.split(',').map(type => `mimeType='${type.trim()}'`).join(' or ');
      url += `&q='${folderId}'+in+parents+and+(${mimeTypes})`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Google Drive API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.files || data.files.length === 0) {
      console.warn('No files found in Google Drive folder');
      return [];
    }

    // Process and return file objects
    const files = data.files.map(file => ({
      id: file.id,
      name: file.name,
      mimeType: file.mimeType,
      webViewLink: file.webViewLink,
      webContentLink: file.webContentLink,
      thumbnailLink: file.thumbnailLink,
      // For images: use high-resolution thumbnail link
      // For videos: use download link for direct access
      directLink: file.mimeType.startsWith('video/') 
        ? `https://drive.google.com/uc?export=download&id=${file.id}`
        : `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`,
      // High resolution image link using thumbnail API
      highResLink: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1600`,
      // Medium resolution for quick loading
      mediumResLink: `https://drive.google.com/thumbnail?id=${file.id}&sz=w800`,
      downloadLink: `https://drive.google.com/uc?export=download&id=${file.id}`, // Direct download link
      // Alternative video streaming URL
      videoStreamLink: file.mimeType.startsWith('video/') 
        ? `https://drive.google.com/file/d/${file.id}/preview`
        : null,
      createdTime: file.createdTime,
      modifiedTime: file.modifiedTime,
      size: file.size,
      parents: file.parents
    }));

    return files;
  } catch (error) {
    console.error('Error fetching files from Google Drive:', error);
    throw error;
  }
}

/**
 * Fetches all subfolders from a Google Drive folder
 * @param {string} folderId - The Google Drive folder ID
 * @param {string} apiKey - The Google Drive API key
 * @returns {Promise<Array>} - Array of folder objects
 */
export async function fetchSubfoldersFromGoogleDrive(folderId, apiKey) {
  try {
    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType='application/vnd.google-apps.folder'&key=${apiKey}&fields=files(id,name,createdTime,modifiedTime)`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Google Drive API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    return data.files || [];
  } catch (error) {
    console.error('Error fetching subfolders from Google Drive:', error);
    throw error;
  }
}

/**
 * Fetches images and videos from nested folder structure: Gallery -> media folders -> files
 * @param {string} galleryFolderId - The main Gallery folder ID
 * @param {string} apiKey - The Google Drive API key
 * @returns {Promise<Array>} - Array of file objects with folder information
 */
export async function fetchImagesFromNestedFolders(galleryFolderId, apiKey) {
  try {
    // First, get all image folders inside the gallery folder
    const imageFolders = await fetchSubfoldersFromGoogleDrive(galleryFolderId, apiKey);
    
    if (imageFolders.length === 0) {
      console.warn('No media folders found in gallery folder');
      return [];
    }

    console.log(`Found ${imageFolders.length} media folders in gallery`);

    // Fetch images from each folder
    const allImages = [];
    
    for (const folder of imageFolders) {
      console.log(`Fetching files from folder: ${folder.name}`);
      
      try {
        const folderImages = await fetchFilesFromGoogleDrive(
          folder.id,
          apiKey,
          'image/jpeg,image/png,image/gif,image/webp,image/bmp,image/svg+xml,video/mp4,video/avi,video/mov,video/wmv,video/flv,video/webm,video/mkv,video/quicktime'
        );

        // Add folder information to each image
        const imagesWithFolderInfo = folderImages.map(image => ({
          ...image,
          folderName: folder.name,
          folderId: folder.id,
          folderCreatedTime: folder.createdTime,
          folderModifiedTime: folder.modifiedTime,
          alt: image.name.replace(/\.[^/.]+$/, ""), // Remove file extension for alt text
          caption: image.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' '), // Clean name for caption
          category: folder.name, // Use folder name as category
          isImage: image.mimeType.startsWith('image/'),
          isVideo: image.mimeType.startsWith('video/')
        }));

        // Debug log to see file types
        const imageCount = imagesWithFolderInfo.filter(f => f.isImage).length;
        const videoCount = imagesWithFolderInfo.filter(f => f.isVideo).length;
        console.log(`Found ${imageCount} images and ${videoCount} videos in folder: ${folder.name}`);

        allImages.push(...imagesWithFolderInfo);
        console.log(`Found ${folderImages.length} files in folder: ${folder.name}`);
      } catch (error) {
        console.error(`Error fetching files from folder ${folder.name}:`, error);
        // Continue with other folders even if one fails
      }
    }

    console.log(`Total files found: ${allImages.length}`);
    return allImages;
  } catch (error) {
    console.error('Error fetching files from nested folders:', error);
    throw error;
  }
}

/**
 * Fetches images and videos from Google Drive for runtime use (supports nested folder structure)
 * This function should be called during server-side rendering or client-side
 * @param {string} folderId - Optional specific folder ID, defaults to env variable
 * @param {boolean} useNestedStructure - Whether to use nested folder structure (Gallery -> image folders -> images)
 * @returns {Promise<Array>} - Array of file objects (images and videos)
 */
export async function getImagesFromGoogleDrive(folderId = null, useNestedStructure = true) {
  // Environment variables for Google Drive API (support both server and client side)
  const driveApiKey = process.env.GOOGLE_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const driveFolderId = folderId || process.env.GOOGLE_DRIVE_FOLDER_ID || process.env.NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID;

  console.log('API Key available:', !!driveApiKey);
  console.log('Folder ID:', driveFolderId);

  if (!driveFolderId || !driveApiKey) {
    console.warn('Google Drive configuration missing. Please set GOOGLE_DRIVE_FOLDER_ID and GOOGLE_API_KEY environment variables.');
    return [];
  }

  try {
    let images;
    
    if (useNestedStructure) {
      // Use nested folder structure: Gallery -> image folders -> images
      images = await fetchImagesFromNestedFolders(driveFolderId, driveApiKey);
    } else {
      // Use flat structure: direct images in folder
      images = await fetchImagesFromGoogleDrive(driveFolderId, driveApiKey);
    }
    
    console.log(`Fetched ${images.length} files from Google Drive`);
    
    return images;
  } catch (error) {
    console.error('Error in getImagesFromGoogleDrive:', error);
    // Return empty array to prevent build failures
    return [];
  }
}

/**
 * Fetches images specifically from a Google Drive folder (flat structure)
 * @param {string} folderId - The Google Drive folder ID
 * @param {string} apiKey - The Google Drive API key
 * @returns {Promise<Array>} - Array of image objects
 */
export async function fetchImagesFromGoogleDrive(folderId, apiKey) {
  try {
    const imageFiles = await fetchFilesFromGoogleDrive(
      folderId, 
      apiKey, 
      'image/jpeg,image/png,image/gif,image/webp,image/bmp,image/svg+xml,video/mp4,video/avi,video/mov,video/wmv,video/flv,video/webm,video/mkv,video/quicktime'
    );

    // Process images with additional metadata
    const images = imageFiles.map(file => ({
      ...file,
      alt: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension for alt text
      caption: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' '), // Clean name for caption
      isImage: file.mimeType.startsWith('image/'),
      isVideo: file.mimeType.startsWith('video/')
    }));

    console.log(images.filter(f => f.isVideo));
    return images;
  } catch (error) {
    console.error('Error fetching images from Google Drive:', error);
    throw error;
  }
}

/**
 * Fetches files from Google Drive for runtime use
 * This function should be called during server-side rendering
 * @param {string} folderId - Optional specific folder ID, defaults to env variable
 * @param {string} mimeType - Optional MIME type filter
 * @returns {Promise<Array>} - Array of file objects
 */
export async function getFilesFromGoogleDrive(folderId = null, mimeType = null) {
  // Environment variables for Google Drive API
  const driveApiKey = process.env.GOOGLE_API_KEY;
  const driveFolderId = folderId || process.env.GOOGLE_DRIVE_FOLDER_ID;

  if (!driveFolderId || !driveApiKey) {
    console.warn('Google Drive configuration missing. Please set GOOGLE_DRIVE_FOLDER_ID and GOOGLE_API_KEY environment variables.');
    return [];
  }

  try {
    const files = await fetchFilesFromGoogleDrive(driveFolderId, driveApiKey, mimeType);
    
    console.log(`Fetched ${files.length} files from Google Drive`);
    
    return files;
  } catch (error) {
    console.error('Error in getFilesFromGoogleDrive:', error);
    // Return empty array to prevent build failures
    return [];
  }
}

/**
 * Get folder contents with pagination support
 * @param {string} folderId - The Google Drive folder ID
 * @param {string} apiKey - The Google Drive API key
 * @param {string} pageToken - Page token for pagination (optional)
 * @param {number} pageSize - Number of files per page (default: 100, max: 1000)
 * @returns {Promise<Object>} - Object with files array and nextPageToken
 */
export async function fetchFolderContentsWithPagination(folderId, apiKey, pageToken = null, pageSize = 100) {
  try {
    let url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}&pageSize=${pageSize}&fields=nextPageToken,files(id,name,mimeType,webViewLink,webContentLink,thumbnailLink,createdTime,modifiedTime,size,parents)`;
    
    if (pageToken) {
      url += `&pageToken=${pageToken}`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Google Drive API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    const files = (data.files || []).map(file => ({
      id: file.id,
      name: file.name,
      mimeType: file.mimeType,
      webViewLink: file.webViewLink,
      webContentLink: file.webContentLink,
      thumbnailLink: file.thumbnailLink,
      // For images: use high-resolution thumbnail link
      // For videos: use download link for direct access
      directLink: file.mimeType.startsWith('video/') 
        ? `https://drive.google.com/uc?export=download&id=${file.id}`
        : `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`,
      // High resolution image link using thumbnail API
      highResLink: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1600`,
      // Medium resolution for quick loading
      mediumResLink: `https://drive.google.com/thumbnail?id=${file.id}&sz=w800`,
      downloadLink: `https://drive.google.com/uc?export=download&id=${file.id}`,
      // Alternative video streaming URL
      videoStreamLink: file.mimeType.startsWith('video/') 
        ? `https://drive.google.com/file/d/${file.id}/preview`
        : null,
      createdTime: file.createdTime,
      modifiedTime: file.modifiedTime,
      size: file.size,
      parents: file.parents
    }));

    return {
      files,
      nextPageToken: data.nextPageToken || null,
      hasMore: !!data.nextPageToken
    };
  } catch (error) {
    console.error('Error fetching folder contents with pagination:', error);
    throw error;
  }
}

/**
 * Get specific file information by file ID
 * @param {string} fileId - The Google Drive file ID
 * @param {string} apiKey - The Google Drive API key
 * @returns {Promise<Object>} - File object
 */
export async function getFileById(fileId, apiKey) {
  try {
    const url = `https://www.googleapis.com/drive/v3/files/${fileId}?key=${apiKey}&fields=id,name,mimeType,webViewLink,webContentLink,thumbnailLink,createdTime,modifiedTime,size,parents`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Google Drive API error: ${response.status} ${response.statusText}`);
    }

    const file = await response.json();
    
    return {
      id: file.id,
      name: file.name,
      mimeType: file.mimeType,
      webViewLink: file.webViewLink,
      webContentLink: file.webContentLink,
      thumbnailLink: file.thumbnailLink,
      // For images: use high-resolution thumbnail link
      // For videos: use download link for direct access
      directLink: file.mimeType.startsWith('video/') 
        ? `https://drive.google.com/uc?export=download&id=${file.id}`
        : `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`,
      // High resolution image link using thumbnail API
      highResLink: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1600`,
      // Medium resolution for quick loading
      mediumResLink: `https://drive.google.com/thumbnail?id=${file.id}&sz=w800`,
      downloadLink: `https://drive.google.com/uc?export=download&id=${file.id}`,
      // Alternative video streaming URL
      videoStreamLink: file.mimeType.startsWith('video/') 
        ? `https://drive.google.com/file/d/${file.id}/preview`
        : null,
      createdTime: file.createdTime,
      modifiedTime: file.modifiedTime,
      size: file.size,
      parents: file.parents
    };
  } catch (error) {
    console.error('Error fetching file by ID:', error);
    throw error;
  }
}

/**
 * Get images grouped by category (folder name) from nested structure
 * @param {string} folderId - Optional specific folder ID, defaults to env variable
 * @returns {Promise<Object>} - Object with categories as keys and image arrays as values
 */
export async function getImagesByCategory(folderId = null) {
  try {
    const images = await getImagesFromGoogleDrive(folderId, true); // Use nested structure
    
    // Group images by category (folder name)
    const imagesByCategory = images.reduce((groups, image) => {
      const category = image.category || 'uncategorized';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(image);
      return groups;
    }, {});

    console.log(`Images grouped into ${Object.keys(imagesByCategory).length} categories`);
    return imagesByCategory;
  } catch (error) {
    console.error('Error getting images by category:', error);
    return {};
  }
}

/**
 * Get list of available image categories (folder names)
 * @param {string} folderId - Optional specific folder ID, defaults to env variable
 * @returns {Promise<Array>} - Array of category names
 */
export async function getImageCategories(folderId = null) {
  const driveApiKey = process.env.GOOGLE_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const driveFolderId = folderId || process.env.GOOGLE_DRIVE_FOLDER_ID || process.env.NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID;

  if (!driveFolderId || !driveApiKey) {
    console.warn('Google Drive configuration missing.');
    return [];
  }

  try {
    const folders = await fetchSubfoldersFromGoogleDrive(driveFolderId, driveApiKey);
    return folders.map(folder => folder.name).sort();
  } catch (error) {
    console.error('Error getting image categories:', error);
    return [];
  }
}

/**
 * Search images in nested folder structure
 * @param {string} query - Search query
 * @param {string} folderId - Optional gallery folder ID, defaults to env variable
 * @returns {Promise<Array>} - Array of image objects matching the search
 */
export async function searchImagesInNestedFolders(query, folderId = null) {
  const driveApiKey = process.env.GOOGLE_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const driveFolderId = folderId || process.env.GOOGLE_DRIVE_FOLDER_ID || process.env.NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID;

  if (!driveFolderId || !driveApiKey) {
    console.warn('Google Drive configuration missing.');
    return [];
  }

  try {
    // Get all images from nested structure
    const allImages = await fetchImagesFromNestedFolders(driveFolderId, driveApiKey);
    
    // Filter images based on search query
    const filteredImages = allImages.filter(image => 
      image.name.toLowerCase().includes(query.toLowerCase()) ||
      image.caption.toLowerCase().includes(query.toLowerCase()) ||
      image.category.toLowerCase().includes(query.toLowerCase())
    );

    console.log(`Found ${filteredImages.length} images matching "${query}"`);
    return filteredImages;
  } catch (error) {
    console.error('Error searching images in nested folders:', error);
    return [];
  }
}
