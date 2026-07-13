export const APP_NAME = "amebo";

export function AppLogo({ classname="", size= 32, alt= APP_NAME }) {
    return (
        <img src="/logo.png" alt={alt} width={size} height={size} className={`shrink-0 object-contain select-name ${classname}`} draggable={false} />
    );
}
