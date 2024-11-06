
import { showErrorMessage } from '@/utils/functions';

export default function ErrorComponent({error}:{error:any}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-0 bg-black md:mt-0 mt-[-290px] bg-opacity-50">
      <div className="bg-black p-6 rounded-lg flex items-center text-center  justify-center shadow-lg max-w-lg w-[300px] h-[200px] relative">
        <button className="absolute top-2 right-2 text-purple-500 hover:text-red-500 transition"></button>
        <p className="text-center text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
          {showErrorMessage(error)}
        </p>
      </div>
    </div>
  );
}
