import React, { useState } from "react";
import { Box, Heading, Text, VStack, Table, Thead, Tbody, Tr, Th, Td, Button, Input, Textarea } from "@chakra-ui/react";
import { FaEnvelope } from "react-icons/fa";

const Index = () => {
  const [order, setOrder] = useState({
    id: 1234,
    status: "Processing",
    total: 99.99,
    customerName: "John Doe",
    customerEmail: "john@example.com",
    items: [
      { id: 1, name: "Product 1", quantity: 2, price: 24.99 },
      { id: 2, name: "Product 2", quantity: 1, price: 49.99 },
    ],
  });

  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");

  const generateEmail = () => {
    setEmailSubject(`Order #${order.id} - ${order.status}`);
    setEmailContent(`
      <p>Dear ${order.customerName},</p>
      <p>Your order #${order.id} is now ${order.status}.</p>
      <p>Order Details:</p>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          ${order.items
            .map(
              (item) => `
            <tr>
              <td>${item.name}</td>
              <td>${item.quantity}</td>
              <td>$${item.price}</td>
            </tr>
          `,
            )
            .join("")}
        </tbody>
      </table>
      <p>Total: $${order.total}</p>
      <p>Thank you for your order!</p>
    `);
  };

  return (
    <Box maxWidth="800px" margin="auto" padding={8}>
      <Heading as="h1" size="xl" textAlign="center" marginBottom={8}>
        Custom WooCommerce Order Status Email System
      </Heading>

      <VStack spacing={6} align="stretch">
        <Box>
          <Heading as="h2" size="lg" marginBottom={4}>
            Order Details
          </Heading>
          <Text>
            <strong>Order ID:</strong> {order.id}
          </Text>
          <Text>
            <strong>Status:</strong> {order.status}
          </Text>
          <Text>
            <strong>Customer:</strong> {order.customerName} ({order.customerEmail})
          </Text>
          <Table variant="simple" marginTop={4}>
            <Thead>
              <Tr>
                <Th>Product</Th>
                <Th>Quantity</Th>
                <Th isNumeric>Price</Th>
              </Tr>
            </Thead>
            <Tbody>
              {order.items.map((item) => (
                <Tr key={item.id}>
                  <Td>{item.name}</Td>
                  <Td>{item.quantity}</Td>
                  <Td isNumeric>${item.price}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Text fontWeight="bold" marginTop={4}>
            Total: ${order.total}
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" marginBottom={4}>
            Generate Email
          </Heading>
          <Button leftIcon={<FaEnvelope />} colorScheme="blue" onClick={generateEmail}>
            Generate Email Content
          </Button>
        </Box>

        {emailContent && (
          <Box>
            <Heading as="h2" size="lg" marginBottom={4}>
              Email Preview
            </Heading>
            <Input value={emailSubject} isReadOnly placeholder="Email Subject" marginBottom={4} />
            <Textarea value={emailContent} isReadOnly placeholder="Email Content" height="200px" />
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default Index;
