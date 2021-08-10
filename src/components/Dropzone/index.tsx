import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';
import { iconColor, iconSize } from '../../constants/constants';
import { rounded, whiteContainer } from '../../styles/styles';

interface DropzoneProps {
    onFileUploaded: (file: File) => void;
}

const Dropzone:React.FC<DropzoneProps> = ({ onFileUploaded }) => {
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

    return (
        <div className={`h-72 flex justify-center items-center outline-none ${rounded} ${whiteContainer}`} { ...getRootProps() }>
            <input { ...getInputProps() } accept="image/*" />

            { selectedFileUrl 
                ? <img className={`w-full h-full object-cover ${rounded}`} src={selectedFileUrl} alt="Imagem da questão" />
                : (
                    <p className={`border-dashed border-tshare border-2 drop-p ${rounded} flex flex-col justify-center items-center text-white gap-3`}>
                        <FiUpload size={iconSize} color={iconColor} />
                        Selecione ou arraste sua imagem aqui
                    </p>
                )
            }
        </div>
    );
}

export default Dropzone;