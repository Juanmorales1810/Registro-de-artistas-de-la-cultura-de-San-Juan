import Link from "next/link";

export default function Home() {
  return (
    <section className="flex justify-center items-center py-10 h-[calc(100vh-467px)] bg-[url('/img/pexels-joshsorenson-976862.jpg')] bg-cover bg-center">
      <div className="container max-w-5xl mx-auto text-center space-y-6 rounded-lg p-6 bg-black bg-opacity-50 backdrop-blur-lg">
        <h1 className="text-3xl font-bold text-white">Registro de artistas de la cultura de San Juan</h1>
        <p className="text-white text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.</p>
        <div>
          <Link
            className="rounded-md bg-orange-600 px-5 py-2.5 text-sm font-medium text-white shadow mt-6"
            href="/inscripcion"
          >
            Inscribirse
          </Link>
        </div>
      </div>

    </section>
  );
}
