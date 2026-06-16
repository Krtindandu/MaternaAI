import { useRef, useState } from "react";

function CameraCapture({ onImageCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [image, setImage] = useState(null);

  const startCamera = async () => {
    try {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
        });

      videoRef.current.srcObject = stream;
    } catch (error) {
      alert("Camera access denied");
    }
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const imageData =
      canvas.toDataURL("image/png");

    setImage(imageData);

    if (onImageCapture) {
      onImageCapture(imageData);
    }
  };

  const uploadImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);

      if (onImageCapture) {
        onImageCapture(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">

      <h2 className="text-xl font-bold">
        Maternal Image Screening
      </h2>

      <div className="flex gap-3 flex-wrap">

        <button
          onClick={startCamera}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          📷 Start Camera
        </button>

        <button
          onClick={capturePhoto}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          📸 Capture Photo
        </button>

      </div>

      <input
        type="file"
        accept="image/*"
        onChange={uploadImage}
      />

      <video
        ref={videoRef}
        autoPlay
        className="w-full rounded-lg border"
      />

      <canvas
        ref={canvasRef}
        style={{ display: "none" }}
      />

      {image && (
        <div>
          <h3 className="font-bold mb-2">
            Preview
          </h3>

          <img
            src={image}
            alt="Preview"
            className="rounded-lg border max-h-80"
          />
        </div>
      )}

    </div>
  );
}

export default CameraCapture;