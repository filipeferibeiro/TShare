export const blackContainer = `
    bg-black
    bg-opacity-40
`;

export const blackContainerHover = `
    hover:bg-black
    hover:bg-opacity-40
`;

export const whiteContainer = `
    bg-white
    bg-opacity-30
`;

export const whiteContainerHover = `
    hover:bg-white
    hover:bg-opacity-30
`;

export const redContainer = `
    bg-tshareRed
    bg-opacity-60
`;

export const greenContainer = `
    bg-tshare
    bg-opacity-60
`;

export const redContainerHover = `
    hover:bg-tshareRed
    hover:bg-opacity-60
`;

export const yellowContainerHover = `
    hover:bg-tshareYellow
    hover:bg-opacity-60
`;

export const greenContainerHover = `
    hover:bg-tshare
    hover:bg-opacity-60
`;

export const transition = `
    transition-all
    duration-200
    ease-in-out
`

export const transitionHover = `
    hover:transition-all
    hover:duration-200
    hover:ease-in-out
`

export const rounded = `
    rounded-2xl
`;

export const starCommentCard = `
    flex
    gap-1
    items-center
    cursor-pointer
    hover:opacity-70
`;

export const starCommentCardP = `
    text-white
    font-light
`;

export const buttonIconName = `
    py-2
    px-6
    flex
    justify-start
    gap-4
    items-center
    text-white
    font-light
    ${whiteContainerHover}
    ${transition}
    hover:${rounded}
`;

export const button = `
    ${rounded}
    py-4
    px-6
    text-white
    text-lg
    bg-opacity-80
    hover:bg-opacity-80
    hover:opacity-80
    ${transition}
`;

export const separator = `
    border-gray-500
    my-5
    w-full
`;

export const separatorPopup = `
    border-gray-400
    w-full
`;

export const loginForm = `
    flex
    w-full
    flex-col
    gap-4
`;

export const checkBox = `
    rounded-md
    w-6
    h-6
    focus:border-none
    focus:outline-none
    ${whiteContainer}
`;

export const checkBoxCheck = `
    rounded-md
    w-6
    h-6
    focus:border-none
    focus:outline-none
    bg-green-400
    bg-opacity-60
    border-2
    border-whitel
`;

export const Option = `
    ${rounded}
    flex
    justify-center
    cursor-pointer
    p-3
    
    text-gray-300

    hover:bg-black
    hover:bg-opacity-20

    ${transition}
`;
    
export const OptionSelected = `
    ${rounded}
    flex
    justify-center
    cursor-pointer
    p-3
    
    ${blackContainer}
    text-white

    hover:bg-black
    hover:bg-opacity-60

    ${transition}
`;

export const RemoveButton = `
    ${rounded}
    hover:bg-tshareRed
    px-4
    text-white
    text-sm
    bg-opacity-80
    hover:bg-opacity-80
    hover:opacity-80
    border
    border-solid
    hover:border-transparent
    border-white
    text-white
    flex
    items-center
    justify-center
`;