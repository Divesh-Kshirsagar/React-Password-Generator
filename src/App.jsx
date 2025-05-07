import { useCallback, useRef, useState, useEffect } from "react";

function App() {
  const [password, setPassword] = useState("abcdefghijk");
  const [length, setLength] = useState(4);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const copyRef = useRef(null);

  useEffect(() => {
    generatePassword();
  },[length, includeNumbers, includeSymbols]);
  
  const copyToClipBoard = () => {
    window.navigator.clipboard.writeText(password);
    copyRef.current.select();
  }

  const generatePassword = useCallback(() => {
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";
    let characters = "";
    for(let i = 0; i < length; i++) {
      if (includeNumbers){
        str += numbers;
      }
      if (includeSymbols) {
        str += symbols; 
      }
      
      characters += str.charAt(Math.floor(Math.random()*str.length))
    }
    setPassword(characters);
  }, [length, includeNumbers, includeSymbols])

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-serif font-bold text-gray-800 mb-8 text-center">Password Generator</h1>
        <div className="flex shadow-md rounded-md px-4 py-3 w-full mb-8">
          <input
            type="text"
            className="outline-none w-full font-serif text-gray-700"
            placeholder="Generated Password"
            value={password}
            readOnly
            ref={copyRef}
          />
          <button  
          onClick={copyToClipBoard}
          className="bg-blue-500 py-2 hover:bg-blue-700 text-white font-serif font-bold px-4 rounded-md">
            Copy
          </button>
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-4">
            <label htmlFor="characterLength" className="block text-nowrap text-gray-700 font-serif text-sm font-bold">
              Character Length
            </label>
            <input
              type="range"
              min={4}
              max={50}
              defaultValue={16}
              className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
              name="characterLength"
              id="characterLength"
              onChange={(e)=>{Number(setLength(e.target.value))}}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center justify-between gap-2">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-500 rounded focus:ring-blue-500 cursor-pointer"
              name="isNumber"
              id="isNumber"
              onClick={(e)=>{Boolean(setIncludeNumbers(e.target.checked))}}
            />
            <label htmlFor="isNumber" className="block text-gray-700 font-serif text-sm font-bold">
              Number
            </label>
          </div>
          <div className="flex items-center justify-between gap-2">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-500 rounded focus:ring-blue-500 cursor-pointer"
              name="isSymbol"
              id="isSymbol"
              onClick={(e)=>{Boolean(setIncludeSymbols(e.target.checked))}}
            />
            <label htmlFor="isSymbol" className="block text-gray-700 font-serif text-sm font-bold">
              Symbol
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
