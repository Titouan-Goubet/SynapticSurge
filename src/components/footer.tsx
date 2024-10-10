export function Footer() {
  return (
    <footer className="py-6 bg-gray-100">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-gray-600">
          Fait par{" "}
          <a
            href="https://github.com/Titouan-Goubet"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Titouan Goubet
          </a>
          . Le code source est disponible sur{" "}
          <a
            href="https://github.com/Titouan-Goubet/SynapticSurge"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
