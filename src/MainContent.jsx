import { useEffect, useState } from "react";

function MainContent() {
  const [image, setImage] = useState("");
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [randomLoading, setRandomLoading] = useState(false);
  const [breedLoading, setBreedLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch available dog breeds when the component mounts
  useEffect(() => {
    async function fetchBreeds() {
      try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");

        if (!response.ok) {
          throw new Error("Failed to fetch breeds");
        }

        const data = await response.json();

        if (data.status !== "success" || !data.message) {
          throw new Error("Invalid breed response");
        }

        const breedList = Object.entries(data.message).flatMap(
          ([breed, subBreeds]) =>
            subBreeds.length > 0
              ? subBreeds.map((subBreed) => `${breed}/${subBreed}`)
              : [breed],
        );

        setBreeds(breedList);
      } catch {
        setError("Failed to load dog breeds.");
      }
    }

    fetchBreeds();
  }, []);

  // Fetch a dog image and track the relevant button's loading state
  async function fetchDogImage(url, loadingType) {
    const setCurrentLoading =
      loadingType === "random" ? setRandomLoading : setBreedLoading;

    setCurrentLoading(true);
    setError("");

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }

      const data = await response.json();

      if (data.status !== "success" || !data.message) {
        throw new Error("Invalid image response");
      }

      setImage(data.message);
    } catch {
      setImage("");
      setError("Failed to load dog image. Please try again.");
    } finally {
      setCurrentLoading(false);
    }
  }

  function getNewImage() {
    fetchDogImage("https://dog.ceo/api/breeds/image/random", "random");
  }

  function getBreedImage() {
    if (!selectedBreed) {
      setError("Please select a dog breed first.");
      return;
    }

    fetchDogImage(
      `https://dog.ceo/api/breed/${selectedBreed}/images/random`,
      "breed",
    );
  }

  function handleImageError() {
    setImage("");
    setError("Image failed to load. Please try again.");
  }

  return (
    <main className="main-content">
      <section className="dog-explorer" id="breeds">
        <p className="section-label">FIND YOUR FAVORITE</p>

        <h2>Explore Dog Breeds</h2>

        <p>
          Discover a random dog or choose a breed to see a dog just for you.
        </p>

        <div className="image-container">
          {randomLoading || breedLoading ? (
            <p>Fetching a new dog...</p>
          ) : image ? (
            <img src={image} alt="Random dog" onError={handleImageError} />
          ) : (
            <p>Your dog image will appear here 🐶</p>
          )}
        </div>

        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}

        <button onClick={getNewImage} disabled={randomLoading}>
          {randomLoading ? "Loading..." : "Get Random Dog"}
        </button>

        <div className="breed-selector">
          <label htmlFor="breed-select">Choose a breed</label>

          <select
            id="breed-select"
            value={selectedBreed}
            onChange={(event) => setSelectedBreed(event.target.value)}
            disabled={breedLoading || breeds.length === 0}
          >
            <option value="">Select a dog breed</option>

            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed.replace("/", " ").replaceAll("-", " ")}
              </option>
            ))}
          </select>

          <button
            onClick={getBreedImage}
            disabled={breedLoading || breeds.length === 0}
          >
            {breedLoading ? "Loading..." : "Show Selected Breed"}
          </button>
        </div>
      </section>
    </main>
  );
}

export default MainContent;
