import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ✅ FIXED: Only what backend needs
interface ActorInput {
  actorId: number;
  characterName: string;
  castOrder: number;
}

interface TrailerInput {
  trailerUrl: string;
  platform: string;
}

interface ImageInput {
  imageUrl: string;
  type: string;
}

const CreateMoviesPage: React.FC = () => {
  const navigate = useNavigate();

  // Movie info
  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [runtimeMinutes, setRuntimeMinutes] = useState<number>(0);
  const [posterURL, setPosterURL] = useState("");

  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  // Relations
  const [actors, setActors] = useState<ActorInput[]>([]);
  const [trailers, setTrailers] = useState<TrailerInput[]>([]);
  const [images, setImages] = useState<ImageInput[]>([]);
  const [productionCompanyIds, setProductionCompanyIds] = useState<number[]>([]);
  const [genreIds, setGenreIds] = useState<number[]>([]);
  const [directorIds, setDirectorIds] = useState<number[]>([]);

  // ================= FILE =================
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;

    const file = e.target.files[0];
    setPosterFile(file);

    const reader = new FileReader();
    reader.onload = () => setPreviewURL(reader.result as string);
    reader.readAsDataURL(file);
  };

  // ================= ACTORS =================
  const addActor = () => {
    setActors([
      ...actors,
      { actorId: 0, characterName: "", castOrder: actors.length + 1 },
    ]);
  };

  const handleActorChange = (index: number, field: string, value: string) => {
    const updated = [...actors];

    if (field === "actorId" || field === "castOrder") {
      (updated[index] as any)[field] = Number(value);
    } else {
      (updated[index] as any)[field] = value;
    }

    setActors(updated);
  };

  // ================= TRAILERS =================
  const addTrailer = () => {
    setTrailers([...trailers, { trailerUrl: "", platform: "" }]);
  };

  const handleTrailerChange = (index: number, field: string, value: string) => {
    const updated = [...trailers];
    (updated[index] as any)[field] = value;
    setTrailers(updated);
  };

  // ================= IMAGES =================
  const addImage = () => {
    setImages([...images, { imageUrl: "", type: "" }]);
  };

  const handleImageChange = (index: number, field: string, value: string) => {
    const updated = [...images];
    (updated[index] as any)[field] = value;
    setImages(updated);
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title,
      releaseDate,
      runtimeMinutes,
      posterUrl: posterURL,
      actors,
      trailers,
      images,
      productionCompanyIds,
      genreIds,
      directorIds,
      description: "",
    };

    try {
      const formData = new FormData();

      // ✅ MUST be "movie"
      formData.append(
        "movie",
        new Blob([JSON.stringify(payload)], { type: "application/json" })
      );

      // ✅ MUST be "posterFile"
      if (posterFile) {
        formData.append("posterFile", posterFile);
      }

      // ❌ DO NOT SET HEADERS
      await axios.post("http://localhost:8082/api/movies", formData);

      alert("Movie created successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Failed to create movie");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Create Movie</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "600px" }}>
        
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
        />

        <input
          type="number"
          placeholder="Runtime"
          value={runtimeMinutes}
          onChange={(e) => setRuntimeMinutes(Number(e.target.value))}
        />

        <input
          type="text"
          placeholder="Poster URL"
          value={posterURL}
          onChange={(e) => setPosterURL(e.target.value)}
        />

        <input type="file" accept="image/*" onChange={handleFileChange} />

        {previewURL && (
          <img src={previewURL} alt="Preview" style={{ width: "200px" }} />
        )}

        {/* ================= ACTORS ================= */}
        <h3>Actors</h3>
        {actors.map((actor, index) => (
          <div key={index} style={{ display: "flex", gap: "5px" }}>
            <input
              type="number"
              placeholder="Actor ID"
              value={actor.actorId || ""}
              onChange={(e) => handleActorChange(index, "actorId", e.target.value)}
            />

            <input
              placeholder="Character"
              value={actor.characterName}
              onChange={(e) =>
                handleActorChange(index, "characterName", e.target.value)
              }
            />

            <input
              type="number"
              placeholder="Order"
              value={actor.castOrder}
              onChange={(e) =>
                handleActorChange(index, "castOrder", e.target.value)
              }
            />
          </div>
        ))}

        <button type="button" onClick={addActor}>
          Add Actor
        </button>

        {/* ================= TRAILERS ================= */}
        <h3>Trailers</h3>
        {trailers.map((t, i) => (
          <div key={i} style={{ display: "flex", gap: "5px" }}>
            <input
              placeholder="Trailer URL"
              value={t.trailerUrl}
              onChange={(e) =>
                handleTrailerChange(i, "trailerUrl", e.target.value)
              }
            />
            <input
              placeholder="Platform"
              value={t.platform}
              onChange={(e) =>
                handleTrailerChange(i, "platform", e.target.value)
              }
            />
          </div>
        ))}

        <button type="button" onClick={addTrailer}>
          Add Trailer
        </button>

        {/* ================= IMAGES ================= */}
        <h3>Images</h3>
        {images.map((img, i) => (
          <div key={i} style={{ display: "flex", gap: "5px" }}>
            <input
              placeholder="Image URL"
              value={img.imageUrl}
              onChange={(e) =>
                handleImageChange(i, "imageUrl", e.target.value)
              }
            />
            <input
              placeholder="Type"
              value={img.type}
              onChange={(e) =>
                handleImageChange(i, "type", e.target.value)
              }
            />
          </div>
        ))}

        <button type="button" onClick={addImage}>
          Add Image
        </button>

        <button
          type="submit"
          style={{
            padding: "10px",
            background: "#4CAF50",
            color: "#fff",
            border: "none",
          }}
        >
          Create Movie
        </button>
      </form>
    </div>
  );
};

export default CreateMoviesPage;
