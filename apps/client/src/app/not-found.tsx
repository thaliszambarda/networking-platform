export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center bg-gray-50 text-center p-6'>
      <h1 className='text-4xl font-bold text-gray-800 mb-2'>404</h1>
      <p className='text-lg text-gray-600 mb-6'>
        A página que você procura não foi encontrada.
      </p>
      <a href='/' className='text-blue-600 hover:underline font-medium'>
        Voltar para a página inicial
      </a>
    </div>
  );
}
