
const Home = () => {
  return (
    <section className='flex-1 w-full flex justify-center items-center m-4'>
  <div className="bg-slate-400 w-[95%] h-full flex flex-col items-center justify-center gap-4">
    <div className="w-2 mr-auto">
      <select name="version" id="version">
      <option value="stt1">STT</option>
      <option value="stt1">STT-1.0.0</option>
      <option value="stt1">STT-1.0.1</option>
    </select>
    </div>
    <div className="bg-slate-500 w-full h-[60%] flex justify-center items-center p-2">
      Output result
    </div>
    <div className="bg-slate-600 w-full h-[20%] flex justify-between items-center p-2">
      Input bar
    </div>
  </div>
</section>
  )
}

export default Home