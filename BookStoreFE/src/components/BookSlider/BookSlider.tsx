import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import BookCard from '../BookCard/BookCard';
import './BookSlider.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Book {
    id: string;
    title: string;
    author: string;
    price: number;
    imageUrl: string;
    rating?: number;
    discount?: number;
}

interface BookSliderProps {
    title: string;
    books: Book[];
}

const BookSlider: React.FC<BookSliderProps> = ({ title, books }) => {
    return (
        <section className="book-slider-section">
            <h2 className="section-title">{title}</h2>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 4,
                    },
                }}
            >
                {books.map((book) => (
                    <SwiperSlide key={book.id}>
                        <BookCard {...book} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default BookSlider; 