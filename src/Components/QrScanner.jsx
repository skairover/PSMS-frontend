import { QrReader } from 'react-qr-reader';

function QRScanner({ onScan, onClose }) {

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-white p-6 rounded-xl w-87.5">

        <h2 className="text-lg font-semibold mb-4">
          Scan QR Code
        </h2>

        <QrReader
          constraints={{ facingMode: "environment" }}
          onResult={(result, error) => {
            if (!!result) {
              onScan(result?.text);
              onClose();
            }
          }}
          style={{ width: "100%" }}
        />

        <button
          onClick={onClose}
          className="mt-4 w-full border py-2 rounded-lg"
        >
          Cancel
        </button>

      </div>

    </div>
  );
}

export default QRScanner;