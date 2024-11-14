// src/utils/fileUtils.ts
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faFileWord, faFileExcel, faFileAudio, faFile } from '@fortawesome/free-solid-svg-icons';

export const isImage = (contentType: string) => contentType.startsWith('image/');
export const isPdf = (contentType: string) => contentType === 'application/pdf';
export const isWord = (contentType: string) =>
    contentType === 'application/msword' ||
    contentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
export const isExcel = (contentType: string) =>
    contentType === 'application/vnd.ms-excel' ||
    contentType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
export const isAudio = (contentType: string) => contentType.startsWith('audio/');

export const getFilePreview = (fileUrl: string, contentType: string) => {
    if (isImage(contentType)) {
        return <img src={fileUrl} alt="preview" style={{ maxWidth: '180px', maxHeight: '100px', borderRadius: '8px' }} />;
    }
    if (isPdf(contentType)) {
        return <FontAwesomeIcon icon={faFilePdf} style={{ fontSize: '24px', color: '#e74c3c' }} />;
    }
    if (isWord(contentType)) {
        return <FontAwesomeIcon icon={faFileWord} style={{ fontSize: '24px', color: '#2e86de' }} />;
    }
    if (isExcel(contentType)) {
        return <FontAwesomeIcon icon={faFileExcel} style={{ fontSize: '24px', color: '#27ae60' }} />;
    }
    if (isAudio(contentType)) {
        return (
            <audio controls style={{ width: '100%' }}>
                <source src={fileUrl} type={contentType} />
                Tu navegador no soporta el elemento de audio.
            </audio>
        );
    }
    // Icono genérico para otros archivos
    return <FontAwesomeIcon icon={faFile} style={{ fontSize: '24px', color: '#7f8c8d' }} />;
};
