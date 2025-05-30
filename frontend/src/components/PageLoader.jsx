import { LoaderIcon } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="min-h-screen flex flex-col gap-2 items-center justify-center " data-theme="cupcake">
      <h1 className="text-3xl font-medium">Please wait</h1>
      <LoaderIcon className="animate-spin size-10 text-primary" />
    </div>
  );
};
export default PageLoader;