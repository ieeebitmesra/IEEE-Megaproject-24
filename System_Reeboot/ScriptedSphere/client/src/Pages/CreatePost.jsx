import { Alert, Button, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreatePost() {

  const initialFormData = {
    topic: "",
    title: "",
    platform: "uncategorized",
    difficulty: "uncategorized",
    content: "",
    youtube: "",
    question: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [publishError, setPublishError] = useState(null);
  const [publishSuccess, setPublishSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setPublishSuccess(false);
      const res = await fetch("/api/post/create", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setPublishError(data.message);
        return;
      } else {
        setPublishError(null);
        setPublishSuccess(true);
        setFormData(initialFormData); // Reset form data
        setTimeout(() => setPublishSuccess(false), 5000);
        setTimeout(() => {
            window.location.reload(); // Refresh the page after success
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a question</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextInput
          value={formData.topic}
          onChange={handleChange}
          type="text"
          placeholder="Topic"
          required
          id="topic"
          className="flex-1"
        />
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            value={formData.title}
            onChange={handleChange}
            type="text"
            placeholder="Problem"
            required
            id="title"
            className="flex-1"
          />
          <Select
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
          >
            <option value="uncategorized">Select a platform</option>
            <option value="leetcode">Leetcode</option>
            <option value="geekForGeeks">GeekForGeeks</option>
            <option value="codeforces">Codeforces</option>
          </Select>
          <Select
            value={formData.difficulty}
            onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
          >
            <option value="uncategorized">Select Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </Select>
        </div>
        <ReactQuill
          value={formData.content}
          onChange={(value) => setFormData({ ...formData, content: value })}
          theme="snow"
          placeholder="Write something"
          className="h-72 mb-12"
          id="content"
        />
        <TextInput
          value={formData.youtube}
          onChange={handleChange}
          type="text"
          placeholder="YouTube Link"
          required
          id="youtube"
          className="flex-1"
        />
        <TextInput
          value={formData.question}
          onChange={handleChange}
          type="text"
          placeholder="Question Link"
          required
          id="question"
          className="flex-1"
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>

        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
        {publishSuccess && (
          <Alert className="mt-5" color="success">
            Created Successfully
          </Alert>
        )}
      </form>
    </div>
  );
}
