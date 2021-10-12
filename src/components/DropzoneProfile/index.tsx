import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';
import { iconColor, iconSize } from '../../constants/constants';
import { blackContainer, transition } from '../../styles/styles';

interface DropzoneProfileProps {
    onFileUploaded: (file: File) => void;
    selectedFile?: File;
    imageLoaded?: string;
}

const DropzoneProfile:React.FC<DropzoneProfileProps> = ({ onFileUploaded, selectedFile, imageLoaded }) => {
    const [selectedFileUrl, setSelectedFileUrl] = useState('');

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];

        const fileUrl = URL.createObjectURL(file);

        setSelectedFileUrl(fileUrl);
        onFileUploaded(file);
    }, [onFileUploaded]);

    const { getRootProps, getInputProps } = useDropzone({ 
        onDrop,
        accept: 'image/*'
    });

    useEffect(() => {
        if (!selectedFile) {
            setSelectedFileUrl('');
        }
    }, [selectedFile])

    return (
        <div className={`${blackContainer}
                        flex
                        justify-center
                        items-center
                        rounded-full
                        border
                        border-transparent
                        hover:border-white
                        ${transition}
                        w-44
                        h-44`} { ...getRootProps() }>
            <input { ...getInputProps() } accept="image/*" />

            { (selectedFileUrl || imageLoaded)  
                ? <img className={`w-full h-full object-cover rounded-full`} src={imageLoaded ? imageLoaded : selectedFileUrl} alt="Imagem de perfil" />
                : (
                    <p className={`border-dashed border-tshare border-2 drop-profile rounded-full flex flex-col text-sm text-center justify-center items-center text-white gap-3`}>
                        <FiUpload size={iconSize} color={iconColor} />
                        Selecione ou arraste sua imagem aqui
                    </p>
                )
            }
        </div>
    );
}

export default DropzoneProfile;