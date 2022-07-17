interface Props {
  image: string;
  description: string;
  postHashHex: string;
}

const NFTCard = ({ image, description, postHashHex }: Props) => {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={`https://diamondapp.com/posts/${postHashHex}`}
      className="flex items-start justify-start flex-col w-full"
    >
      <img src={image} className="w-full rounded" alt="" />
      <p className="text-[14px] mt-[20px]">
        {description?.length > 150
          ? `${description.slice(0, 147)}...`
          : description}
      </p>
      <span className="bg-primary text-black font-bold text-[14px] px-[20px] py-[5px] rounded mt-[20px]">
        View Post
      </span>
    </a>
  );
};

export default NFTCard;
