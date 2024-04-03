import { ComponentProps } from "react"

/* o NavLinkProps pode receber qualquer propriedade que tenha na tag ancora */
interface NavLinkProps extends ComponentProps<'a'>{
    children: string
}

export function NavLink(props: NavLinkProps) {
    return (
        /* ...props - pega todas as propriedades enviadas para o NavLink e adiciona como atributo na tag a */
        <a {...props} className="font-medium text-sm">
            {props.children}
        </a>

    )
}