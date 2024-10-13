// import {
//   Box,
//   Flex,
//   Image,
//   Table,
//   TableContainer,
//   Tbody,
//   Td,
//   Tfoot,
//   Th,
//   Thead,
//   Tr,
// } from "@chakra-ui/react";

// interface Table {
//   data: [];
//   isLoading: React.ReactNode;
//   isError: React.ReactNode;
//   error: any;
// }

// const TableData: React.FC<Table> = ({ data, isLoading, isError, error }) => {
//   return (
//     <>
//       {" "}
//       <TableContainer>
//         <Table size="sm">
//           <Thead>
//             <Tr>
//               <Th w={"40px"}>#</Th>
//               <Th w={"80px"}>Images</Th>
//               <Th>Title</Th>
//               <Th w={"30%"}>Description</Th>
//               <Th isNumeric>Price</Th>
//               <Th>Type</Th>
//               <Th>Tag</Th>
//             </Tr>
//           </Thead>
//           <Tbody>
//             {data?.map((data, index: number) => {
//               return (
//                 <Tr>
//                   <Td>{index + 1}</Td>
//                   <Td>
//                     <Image src={data?.media[0].url} alt="Dan Abramov" />
//                   </Td>
//                   <Td>{limitText(data?.title, 50)}</Td>
//                   <Td>{limitText(data?.description, 50)}</Td>
//                   <Td isNumeric>{product?.price}</Td>
//                   <Td>{product?.product_type}</Td>
//                   <Td>
//                     <Flex flexWrap={"wrap"} gap={"2px"}>
//                       {product?.tags?.map((tag: any) => (
//                         <Box
//                           as="span"
//                           fontSize={"12px"}
//                           backgroundColor={"gray.200"}
//                           p={"1px 2px"}
//                           borderRadius={"2px"}
//                         >
//                           {limitText(tag, 6)}
//                         </Box>
//                       ))}
//                     </Flex>
//                   </Td>
//                 </Tr>
//               );
//             })}
//           </Tbody>
//         </Table>
//       </TableContainer>
//     </>
//   );
// };

// export default TableData;
