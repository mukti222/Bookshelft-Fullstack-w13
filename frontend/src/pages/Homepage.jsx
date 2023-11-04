import { VStack, SimpleGrid, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Books from "../components/Books";
import { getAllBooks } from "../modules/fetch";
import backgroundImage from '../assets/1.jpg';

 


export default function Homepage() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchBooks = async () => {
      const books = await getAllBooks();
      setBooks(books);
    };
    fetchBooks();
  }, []);

  return (
    <VStack w="100%"
    background={`url(${backgroundImage}) no-repeat center center/cover`} >
    <SimpleGrid columns={3} spacing={4} mb={10} gap={12} >


      {books?.books?.map((book) => (
        <Books key={`${book.id} ${book.title}`} {...book} />
      ))}

      </SimpleGrid>
      
    </VStack>
  );
}
