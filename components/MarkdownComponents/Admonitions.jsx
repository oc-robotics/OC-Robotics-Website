import '@/styles/Admonitions.css'
import { SmsFailedOutlined, LightbulbOutline, InfoOutline, WarningAmberOutlined, ReportGmailerrorredOutlined } from '@mui/icons-material';

function Admonitions({ type, children}) {
  return (
    <div className={`admonition admonition-${type.toLowerCase()}`}>
      <strong>
        {getIcon(type)}
        {type.toUpperCase()}:
      </strong>
      <p className="admonition-message">{children}</p>
    </div>
  )
}

function getIcon(type) {
  switch (type.toLowerCase()) {
    case 'important':
      return <SmsFailedOutlined />;
    case 'warning':
      return <WarningAmberOutlined />;
    case 'caution':
      return <ReportGmailerrorredOutlined />;
    case 'tip':
      return <LightbulbOutline />;
    case 'info':
      return <InfoOutline />;
  }
}

export default Admonitions;