import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    FormErrorMessage,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Form } from 'react-bootstrap';
import SignupSchema from '../../validation/SignupSchema';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, database } from '../../config/firbase-config';
import { ref, set } from 'firebase/database';
import { toast } from 'react-hot-toast';

export default function SignUp() {
    auth.signOut()
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const initialValues = {
        firstName: 'Hardik',
        lastName: 'Desai',
        email: 'demo@gmail.cvom',
        password: 'Hardik@123',
    }
    const handleSubmit = async (values) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
            await set(ref(database, 'users/' + userCredential.user.uid), {
                firstName: values.firstName,
                lastName: values.lastName
            });
            navigate('/posts')
            toast.success("Signup Successfully !!")
        } catch (error) {
            toast.error(error.message)
        }
    }

    const formik = useFormik({
        initialValues,
        onSubmit: handleSubmit,
        validationSchema: SignupSchema
    })

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign up
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool features ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <Form onSubmit={formik.handleSubmit}>
                            <HStack>
                                <Box>
                                    <FormControl
                                        id="firstName"
                                        isInvalid={formik.errors.firstName && formik.touched.firstName}>
                                        <FormLabel>First Name</FormLabel>
                                        <Input
                                            name='firstName'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.firstName}
                                            type="text" />
                                        {formik.touched.firstName && (
                                            <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
                                        )}
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl
                                        id="lastName"
                                        isInvalid={formik.errors.lastName && formik.touched.lastName}>
                                        <FormLabel>Last Name</FormLabel>
                                        <Input
                                            name='lastName'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.lastName}
                                            type="text" />
                                        {formik.touched.lastName && (
                                            <FormErrorMessage>{formik.errors.lastName}</FormErrorMessage>
                                        )}
                                    </FormControl>
                                </Box>
                            </HStack>
                            <FormControl
                                id="email"
                                isInvalid={formik.errors.email && formik.touched.email}>
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    name='email'
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    type="email"
                                />
                                {formik.touched.email && (
                                    <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                                )}
                            </FormControl>
                            <FormControl
                                id="password"
                                isInvalid={formik.errors.password && formik.touched.password}>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        name='password'
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() =>
                                                setShowPassword((showPassword) => !showPassword)
                                            }>
                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                {formik.touched.password && (
                                    <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                                )}
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                <Button
                                    type='submit'
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Sign up
                                </Button>
                            </Stack>
                        </Form>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Already a user? <NavLink color={'blue.400'} to='/login' >Login</NavLink>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}