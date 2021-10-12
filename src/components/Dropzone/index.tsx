import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';
import { iconColor, iconSize } from '../../constants/constants';
import { rounded, whiteContainer } from '../../styles/styles';

interface DropzoneProps {
    onFileUploaded: (file: File) => void;
    selectedFile?: File;
    imageLoaded?: string;
}

const Dropzone:React.FC<DropzoneProps> = ({ onFileUploaded, selectedFile, imageLoaded }) => {
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
        <div className={`min-drop flex justify-center items-center outline-none ${rounded} ${whiteContainer}`} { ...getRootProps() }>
            <input { ...getInputProps() } accept="image/*" />

            { (selectedFileUrl || imageLoaded) 
                ? <img className={`w-full h-full object-cover ${rounded}`} src={selectedFileUrl ? selectedFileUrl : imageLoaded} alt="Imagem da questão" />
                : (
                    <p className={`m-8 w-full h-72 flex-1 border-dashed border-tshare border-2 ${rounded} flex flex-col justify-center items-center text-white gap-3`}>
                        <FiUpload size={iconSize} color={iconColor} />
                        Selecione ou arraste sua imagem aqui
                    </p>
                )
            }
        </div>
    );
}

export default Dropzone;