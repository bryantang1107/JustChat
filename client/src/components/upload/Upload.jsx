import { IKContext, IKUpload } from "imagekitio-react";
import { useRef } from "react";
import axios from "../../axios.js";

const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT;
const publicKey = import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY;
const authenticator = async () => {
  try {
    const { status, data } = await axios.get("/api/upload", {
      withCredentials: true,
    });

    if (status !== 200) {
      throw new Error(`Request failed with status ${status}: ${data}`);
    }

    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const Upload = ({ setImg }) => {
  const ikUploadRef = useRef(null);
  const onError = (err) => {
    console.log("Error", err);
    setImg((prev) => ({
      ...prev,
      isLoading: false,
      error: err,
    }));
  };

  const onSuccess = (res) => {
    console.log("Success", res);
    setImg((prev) => ({
      ...prev,
      isLoading: false,
      dbData: res,
    }));
  };

  const onUploadProgress = (progress) => {
    console.log("Progress", progress);
    setImg((prev) => ({
      ...prev,
      isLoading: true,
    }));
  };

  const onUploadStart = (evt) => {
    const file = evt.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImg((prev) => ({
        ...prev,
        isLoading: true,
        aiData: {
          inlineData: {
            data: reader.result.split(",")[1],
            mimeType: file.type,
          },
        },
      }));
    };
    reader.readAsDataURL(file);
  };
  return (
    <div>
      <IKContext
        urlEndpoint={urlEndpoint}
        publicKey={publicKey}
        authenticator={authenticator}
      >
        <IKUpload
          fileName="test-upload.png"
          onError={onError}
          onSuccess={onSuccess}
          useUniqueFileName={true}
          onUploadProgress={onUploadProgress}
          onUploadStart={onUploadStart}
          style={{ display: "none" }}
          ref={ikUploadRef}
        />
        {
          <label onClick={() => ikUploadRef.current.click()}>
            <img src="/attachment.png" alt="attachment" />
          </label>
        }
      </IKContext>
    </div>
  );
};

export default Upload;
