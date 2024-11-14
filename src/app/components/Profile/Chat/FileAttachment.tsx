import React from 'react';
import { getFilePreview } from '../../../../utils/fileUtils';

interface FileAttachmentProps {
    fileUrl: string;
    filename: string;
    contentType: string;
    onImageClick?: (src: string) => void;
}

const FileAttachment: React.FC<FileAttachmentProps> = ({ fileUrl, filename, contentType, onImageClick }) => {
    const preview = getFilePreview(fileUrl, contentType);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5px' }}>
            {contentType.startsWith('image/') ? (
                <div onClick={() => onImageClick && onImageClick(fileUrl)} style={{ cursor: 'pointer' }}>
                    {preview}
                </div>
            ) : (
                <div style={{ textAlign: 'center' }}>
                    <div>{filename}</div>
                    {preview}
                    <button
                        onClick={() => window.open(fileUrl, '_blank')}
                        style={{
                            marginTop: '5px',
                            padding: '8px 12px',
                            backgroundColor: '#4b9cd3',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                            transition: 'background-color 0.3s ease',
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#367bbd')}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#4b9cd3')}
                    >
                        Descargar archivo
                    </button>
                </div>
            )}
        </div>
    );
};

export default FileAttachment;
