function Layout({ children }) {
  return (
    <>
      <header className="flex items-center justify-between bg-[#3874ff] py-[20px] px-5 mb-[150px] rounded-[10px]">
        <h1 className="text-3xl font-bold">Crypto App</h1>
      </header>
      {children}
      <footer className="text-center bg-[#3874ff] py-5 mt-2 rounded-[10px]">
        <p className="text-xl font-semibold">Developer by Haniye</p>
      </footer>
    </>
  );
}

export default Layout;
