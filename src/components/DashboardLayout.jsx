import NavigationBar from "./NavigationLayout/TopBar";

export default function DashboardLayout({children}) {
    return (
        <>
            <NavigationBar />
            <div className="container mx-auto mt-8 w-[95%]">
                {children}
            </div>
        </>
    );
}
