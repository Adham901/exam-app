import { FolderCode ,  Brain, BookOpenCheck, RectangleEllipsis} from "lucide-react";





export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
 
     <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
    
      <div className="bg-gradient-to-b from-blue-100 to-blue-50 flex flex-col justify-center items-start p-30">
  <h1 className="flex items-center gap-2 text-blue-600 font-bold text-lg mb-27 -mt-30 ">
      <div className="p-2 border border-blue-500 rounded-md bg-blue-600">
      <FolderCode className=" stroke-white" />
    </div>
    Exam App
  </h1>

  <h2 className="text-2xl text-[#111827] font-bold mb-6">
    Empower your learning journey <br /> with our smart exam platform.
  </h2>

  <div className="space-y-6">
    <div className="flex items-start space-x-3">
        <div className="p-2 border border-blue-500 rounded-md">
        <Brain className="w-6 h-6 text-blue-500" />
      </div>
      <div>
        <h3 className="font-semibold text-blue-600">Tailored Diplomas</h3>
        <p className="text-sm text-gray-600">
          Choose from specialized tracks like <br />Frontend, Backend, and Mobile<br /> Development.
        </p>
      </div>
    </div>

    <div className="flex items-start space-x-3">
     <div className="p-2 border border-blue-500 rounded-md">
        <BookOpenCheck className="w-6 h-6 text-blue-500" />
      </div>
      <div>
        <h3 className="font-semibold text-blue-600">Focused Exams</h3>
        <p className="text-sm text-gray-600">
          Access topic-specific tests including<br /> HTML,  CSS,  JavaScript, and more.
        </p>
      </div>
    </div>

    <div className="flex items-start space-x-3">
          <div className="p-2 border border-blue-500 rounded-md">
       <RectangleEllipsis className="w-6 h-6 text-blue-500" />
      </div>
      <div>
        <h3 className="font-semibold text-blue-600">Smart Multi-Step Forms</h3>
        <p className="text-sm text-gray-600">
          Choose from specialized tracks like<br /> Frontend, Backend, and Mobile<br /> Development.
        </p>
      </div>
    </div>
  </div>
</div>


    {children}
     
    </div>
    
  
  );
}
