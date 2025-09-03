import Sidebar from "@/app/projects/components/sidebar";


export default function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
 
     <div className="flex   h-screen">
    
        <Sidebar />
        <main className="ml-64 flex-1">{children}</main>
    </div>
    
  
  );
}
