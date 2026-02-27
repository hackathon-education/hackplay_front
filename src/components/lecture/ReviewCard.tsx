import StarIcon from '@/assets/lecture/star-icon.svg?react';

interface ReviewProps {
  userName: string;
  rating: number;
  comment: string;
}

interface ReviewCardProps {
  review: ReviewProps;
}

const ReviewCard = ({ review }: { review: ReviewProps }) => (
  <div className="border border-card-border lg:h-[221px] flex flex-col justify-center p-6 lg:pl-[31px] lg:pr-13 lg:pt-6 lg:pb-[23px] rounded-20 bg-card-bg shadow-2 hover:bg-card-hover-bg transition-colors">
    <div className="flex mb-9">
      {[...Array(5)].map((_, i) => (
        <StarIcon
          key={i}
          className={`w-[17px] h-[17px] ${i < review.rating ? 'text-icon-yellow-500' : 'text-icon-neutral-250'}`}
        />
      ))}
    </div>
    <p className="text-text-base flex-grow leading-[1.2] mb-7.5">"{review.comment}"</p>
    <div className="flex gap-4 items-center">
      {/* TODO: 프로필 이미지 삽입 */}
      <div className="w-8 h-8 rounded-full bg-profile-img-border" />
      <p className="font-medium text-text-title">{review.userName}</p>
    </div>
  </div>
);

export default ReviewCard;
export type { ReviewProps };
