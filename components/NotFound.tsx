import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-700">404</h1>
      <p className="text-lg text-gray-700 mt-2">Oops! Project not found.</p>
      {/* <Link href="/module">
        <a className="mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          Voltar para a página inicial
        </a>
      </Link> */}
    </div>
  );
};

export default NotFound;
