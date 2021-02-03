import React, { InputHTMLAttributes, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import AddField from '../../../../Components/AddField';
import Slider from '../../../../Components/Slider';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    type: string;
    label: string;
    labelAlt?: string;
    limit?: number;
    func(text: string): any;
    id?: string;
}

const Field: React.FC<InputProps> = ({ type, label, labelAlt, limit, children, func, hidden, id }) => {
    const [inputValue, setInputValue] = useState<string>("");

    function handleInputValue(value:string) {
        setInputValue(value);
        func(value);
    }
    if (!hidden) {
        return (
            <div className="field">
                <div className="nameField">
                    <div className="left">
                        <p className="fieldName">{label}</p>
                        <p className="fieldAlt">{labelAlt}</p>
                    </div>
                {limit && 
                    <p className="limit">Máximo {limit}</p>
                }
                </div>
                {type.toLocaleLowerCase() === "text" &&
                    <input id={id} type="text" value={inputValue} onChange={(e) => handleInputValue(e.target.value)} required />
                }
                {type.toLocaleLowerCase() === "textarea" && 
                    <textarea id={id} value={inputValue} onChange={(e) => handleInputValue(e.target.value)} required />
                }
                {type.toLocaleLowerCase() === "image" &&
                    <div className="imageField">
                        <FiPlus color='#58E2C1' size={50}  />
                    </div>
                }
                {type.toLocaleLowerCase() === "alternatives" &&
                    <div className="alternatives">
                        {children}
                        <AddField id={id} func={func} />
                    </div>
                }
                {type.toLocaleLowerCase() === "subject" &&
                    <div className="subjectContainer">
                        <select className="subjectBox" name="subjects">
                            <option value="matematica">Matemática</option>
                            <option value="matematica">História</option>
                            <option value="matematica">Geografia</option>
                        </select>
                        <div className="private">
                            <p>Questão Privada?</p>
                            <Slider />
                        </div>
                    </div>
                }
                {type.toLocaleLowerCase() === "tags" &&
                    <div className="tags">
                        <div className="tagsBox">
                            {children}
                        </div>
                        <AddField id={id} func={func} />
                    </div>
                }
                {type.toLocaleLowerCase() === "justificative" &&
                    <div className="tags">
                        <div className="tagsBox">
                            {children}
                        </div>
                        <AddField id={id} func={func} />
                    </div>
                }
            </div>
        );
    } else {
        return(
            <></>
        );
    }
}

export default Field;
