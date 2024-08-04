interface LessonPlayerProps {
  title: string;
  thumbnail: string;
  video: string;
  index: number;
  lessonsCount: number;
}

const LessonPlayer: React.FC<LessonPlayerProps> = ({
  title,
  thumbnail,
  video,
  index,
  lessonsCount,
}) => {
  return (
    <>
      <ul className="w-full flex justify-between mb-2">
        <li>
          <h3 className="text-blue-600">{title}</h3>
        </li>
        <p className="text-sm font-medium text-blue-600 mr-2">
          Lesson {index} of {lessonsCount}
        </p>
      </ul>
      <video
        poster={`https://res.cloudinary.com/depztpide/image/upload/${thumbnail}`}
        controls
        className="w-full rounded-lg"
      >
        <source
          src={`https://res.cloudinary.com/depztpide/video/upload/${video}`}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </>
  );
};

export default LessonPlayer;
