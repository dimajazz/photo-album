import { Icons, IconNameType } from 'constants/icons'
import './icon.css'

export const Icon = (props: IconProps) => {
    const {name, cssClass=''} = props
    const path = Icons[name].path
    const viewBox = Icons[name].viewBox

    return (
        <svg 
            className={cssClass} 
            xmlns='http://www.w3.org/2000/svg'
            width='100%'
            height='100%'
            viewBox={viewBox}
            fill='currentColor'
        >
            <path d={path} />
        </svg> 
    )
}

type IconProps = {
    name: IconNameType;
    cssClass?: string
}
