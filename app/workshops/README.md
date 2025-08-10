# Adding Canva Slides to the Workshops Page

To add Canva slides to the workshops page, follow these steps:

## 1. Prepare Your Slides
- Create your slides in Canva.
- Publish your presentation and copy the embed link provided by Canva.
![Share Design](/public/README%20images/shareDesign.png)
![Copy Embed URL](/public/README%20images/copyEmbedURL.png)
> Copy the `Smart embed link`

## 2. Modify the Embed Link
- Append `?embed` to the end of the Canva embed URL.
  - Example: `https://www.canva.com/design/your-design-id/view?embed`

## 3. Add to the List of Workshops
- Head to the `page.jsx` in the `workshops` folder
- In the workshops variable: 
  - Copy the following to the end of the list: 
  ```jsx
  {
    id: 7, // add 1 to the previous ID number
    title: 'title of workshop',
    description: 'Short description of the workshop',
    date: 'date created the slide',
    type: 'which subteam\'s workshop',
    slidesUrl: 'copied url'
  },
  ```

## 4. Verify
- Open the workshops page in your browser.
- Ensure the embedded slides display and function correctly.

---

**Tip:** Update the Canva embed links as workshops change or slides are revised.
