import { useEffect, useState } from "react";
import Stories from "react-insta-stories";

const Story = () => {
    const [stories, setStories] = useState([]);

    const getStories = async () => {
        try {
            const res = await fetch("http://localhost:3001/posts", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!res.ok) {
                throw new Error('Failed to fetch posts');
            }

            const data = await res.json();
            console.log("Stories: ", data);
            setStories(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
            setStories([]);
        }
    };

    useEffect(() => {
        getStories();
    }, []);

    return (
        <>
            {stories && stories.map((story, index) => (
                <Stories
                    key={index}
                    stories={[{ url: story.url }]}
                    defaultInterval={1500}
                    width={432}
                    height={768}
                />
            ))}
        </>
    );
};

export default Story;
