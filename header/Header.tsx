import Link from 'next/link';
import MenuClients from '@/components/MenuClients';
import MobileDrawer from '@/components/page/header/MobileDrawer';
import type { MenuItem } from '@/models/Menu';
import SearchPopUp from '@/components/SearchPopUp';

interface Header1Props {
    settings?: Record<string, any>;
    mainItems?:      MenuItem[];
    mobileItems?:    MenuItem[];
    builderContent?: Record<string, any[]>;
}

export default function Headerkb({
    settings = {},
    mainItems      = [],
    mobileItems    = [],
    builderContent = {},
}: Header1Props) {
    const isSticky      = settings.header_sticky      !== 'false';
    const isTransparent = settings.header_transparent === 'true';

    return (
        <header className={`z-50 ${isSticky ? 'sticky top-0' : 'relative'} ${isTransparent ? 'bg-transparent' : 'bg-white'}`}>
            <div className='container flex items-center justify-between w-full py-4'>
                <Link href="/" className="text-xl font-extrabold text-gray-900 tracking-tight shrink-0 flex items-center">
                    {settings.logo ? (
                        <img src={settings.logo} alt={settings.siteName} className="h-10 md:h-14 w-auto object-contain" />
                    ) : (
                        settings.siteName
                    )}
                </Link>
                <div className='flex items-center gap-2'>
                    <SearchPopUp type='blog' fontSize={20} iconColor='#374151' />
                    <MobileDrawer items={mobileItems} settings={settings} iconColor="#374151" />
                </div>
            </div>
            {mainItems.length > 0 ? (
                <div className="border-t border-gray-200">
                    <div className="container hidden md:flex flex-1">
                        <MenuClients menuItems={mainItems} settings={settings} builderContent={builderContent} className="flex items-center" />
                    </div>
                </div>
            ) : null}
        </header>
    );
}
