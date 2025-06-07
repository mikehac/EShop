import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import { FormEvent, useState } from "react";
import { Star } from "../star";
import { useParams } from "react-router-dom";
import { useUserId } from "../../hooks/useUserId";
import { httpPost } from "../../utils/service";

interface ratingSubmitData {
  productId: number;
  userId: string;
  ratingId: number;
  ratingDescription: string;
}

export function ReviewModal({ showModal, setShowModal }: { showModal: boolean; setShowModal: (value: boolean) => void }) {
  const { id } = useParams<{ id: string }>(); // Extract the 'id' parameter from the URL
  const userId = useUserId();

  const [currentRating, setCurrentRating] = useState<number>(0);

  const handleClose = () => {
    setShowModal(false);
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const ratingData: ratingSubmitData = {
      productId: Number(id),
      userId: userId ?? "",
      ratingId: Number(formData.get("ratingId")),
      ratingDescription: (formData.get("description") ?? "") as string,
    };
    console.log(ratingData);

    httpPost("product-rating", ratingData).then((res) => {
      handleClose();
    });
  }

  return (
    <Modal open={showModal} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box>
        <form onSubmit={handleSubmit} className="rating-form">
          <header>Rate product</header>
          <div className="rating-row">
            <label htmlFor="ratingId">Rating:</label>
            <Star rating={currentRating} isClickable={true} onRatingChange={(newRating) => setCurrentRating(newRating)} />
            <input type="hidden" name="ratingId" value={currentRating} readOnly />
          </div>
          <div className="rating-row">
            <label htmlFor="description">Description:</label>
            <textarea name="description"></textarea>
          </div>
          <button>Submit</button>
        </form>
      </Box>
    </Modal>
  );
}
