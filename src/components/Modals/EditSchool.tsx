import React, { useState, useEffect } from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	FormControl,
	FormLabel,
	Input,
	Button,
	Flex,
	Box,
	Select,
	useToast,
	Tabs,
	Avatar,
	TabPanels,
	Tab,
	TabPanel,
	Textarea,
	Text,
	IconButton,
} from "@chakra-ui/react";
import { DayPicker } from "react-day-picker";
import { Formik, Form, Field } from "formik";
import { realState, monthDropDown } from "../../../fakedata";
import {
	useGetSchoolByNameQuery,
	useUpdateSchoolDetailsMutation,
	School,
} from "../../gql/graphql";
import { useRouter } from "next/router";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import FileBase from "react-file-base64";
import { IoArrowBackOutline } from "react-icons/io5";
import styles from "../../../styles/Input.module.css";

interface EditSchoolProps {
	s: School;
	isOpen: any;
	onClose: any;
}

export const EditSchool: React.FC<EditSchoolProps> = ({
	s,
	isOpen,
	onClose,
}) => {
	const initialRef = React.useRef(null);
	const finalRef = React.useRef(null);
	const [, update] = useUpdateSchoolDetailsMutation();
	const router = useRouter();
	const toast = useToast();
	const [selected, setSelected] = React.useState<Date>();
	type State = {
		image: string;
	};
	const [logo, setLogo] = React.useState<State>({
		image: s?.logoImgUrl,
	});
	const [banner, setBanner] = React.useState<State>({
		image: s?.bannerImgUrl,
	});

	const [tabIndex, setTabIndex] = React.useState(0);

	const handleGoBack = () => {
		if (tabIndex === 0) {
			return tabIndex;
		}
		return setTabIndex(tabIndex - 1);
	};

	const handleClose = () => {
		setTabIndex(0);		
		onClose();
	  }

	return (
		<Formik
			initialValues={{
				logoImgUrl: s?.logoImgUrl,
				schoolName: s?.schoolName,
				address: s?.address,
				description: s?.description,
				state: s?.state,
				rcnumber: s?.rcnumber,
				bannerImgUrl: s?.bannerImgUrl,
				websiteUrl: s?.websiteUrl,
				instagramUrl: s?.instagramUrl,
				twitterUrl: s?.twitterUrl,
				facebookUrl: s?.facebookUrl,
				linkedinUrl: s?.linkedinUrl,
			}}
			onSubmit={async (values, { setErrors }) => {
				const response = await update({
					schoolId: s?.id,
					logoImgUrl: logo.image,
					state: values?.state ? values.state : s?.state,
					rcnumber: values?.rcnumber ? values.rcnumber : s?.rcnumber,
					twitterUrl: values?.twitterUrl,
					instagramUrl: values?.instagramUrl,
					websiteUrl: values?.websiteUrl,
					bannerImgUrl: banner.image,
					address: values?.address ? values?.address : s?.address,
					description: values?.description,
					schoolName: values?.schoolName ? values?.schoolName : s?.schoolName,
				});
				if (response.error) {
					toast({
						title: "Error.",
						description: "We could not update the school",
						status: "error",
						variant: "left-accent",
						duration: 5000,
						isClosable: true,
					});
					// setTimeout(() => {
					//   router.reload();
					// }, 1000)
				} else if (response?.data?.updateSchoolDetails === true) {
					console.log(values);
					toast({
						title: "school updated Successfully.",
						description: "We've updateed your school for you.",
						status: "success",
						variant: "left-accent",
						duration: 5000,
						isClosable: true,
					});
					setTimeout(() => {
						router.reload();
					}, 1000);
				}
			}}
		>
			{(props) => (
				<Modal
					initialFocusRef={initialRef}
					finalFocusRef={finalRef}
					isOpen={isOpen}
					onClose={onClose}
					motionPreset="slideInBottom"
				>
					<ModalOverlay />
					<ModalContent pos="fixed" mt={3} minW="40rem" maxH="45rem">
						<Flex w="full" p={1}>
							<IconButton
								variant="ghost"
								aria-label="go back"
								icon={<IoArrowBackOutline />}
								onClick={handleGoBack}
							/>
							<ModalCloseButton onClick={handleClose} />
						</Flex>
						<Tabs index={tabIndex} variant="enclosed" isFitted mt={-10}>
							<TabPanels>
								<TabPanel>
									<ModalHeader textAlign="center">
										Update School Details
									</ModalHeader>
									<ModalBody pb={6}>
										<Form>
											<Field name="logoImgUrl">
												{({ field, form }: any) => (
													<FormControl>
														<Flex direction="column" align="center">
															<FormLabel>Update School Image</FormLabel>
															<Avatar src={logo.image} size="xl" mb={1} />
															<Flex
																align="center"
																ml={20}
																className={styles?.inputBtn}
															>
																<FileBase
																	{...field}
																	type="file"
																	multiple={false}
																	accept="image/*"
																	onDone={({ base64 }: { base64: string }) =>
																		setLogo({ ...logo, image: base64 })
																	}
																/>
															</Flex>
														</Flex>
													</FormControl>
												)}
											</Field>

											<Field name="schoolName">
												{({ field, form }: any) => (
													<FormControl mt={4}>
														<FormLabel>School Name</FormLabel>
														<Input {...field} isDisabled ref={initialRef} focusBorderColor="#F4B95F" />
													</FormControl>
												)}
											</Field>

												<Field name="address">
													{({ field, form }: any) => (
														<FormControl mt={4}>
															<FormLabel>Address</FormLabel>
															<Input
																{...field}
																focusBorderColor="#F4B95F"
																isDisabled
															/>
														</FormControl>
													)}
												</Field>

												<Field name="description">
													{({ field, form }: any) => (
														<FormControl mt={4}>
															<FormLabel>Description</FormLabel>
															<Textarea
																{...field}
																focusBorderColor="#F4B95F"
															/>
														</FormControl>
													)}
												</Field>
										
											<Field name="state">
												{({ field, form }: any) => (
													<FormControl mt={4}>
														<FormLabel>State</FormLabel>
														<Select
															placeholder={s?.state}
															w={40}
															focusBorderColor="#F4B95F"
															{...field}
														>
															{realState.map((state, id) => (
																<option value={state} key={id}>
																	{state}
																</option>
															))}
														</Select>
													</FormControl>
												)}
											</Field>

											<Flex direction="row" justify="end" mt={3}>
												<Button
													bg="#F4B95F"
													color="white"
													_hover={{ bg: "#DAA65D" }}
													mr={3}
													onClick={() => setTabIndex(1)}
												>
													Next
												</Button>
												<Button onClick={handleClose}>Cancel</Button>
											</Flex>
										</Form>
									</ModalBody>{" "}
								</TabPanel>
								<TabPanel>
									<ModalHeader textAlign="center">
										School Details
									</ModalHeader>
									<ModalBody pb={6}>
										<Form>
											<Field name="rcnumber">
												{({ field, form }: any) => (
													<FormControl mt={4}>
														<FormLabel>RC Number</FormLabel>
														<Input
															{...field}
															focusBorderColor="#F4B95F"
															isDisabled
														/>
													</FormControl>
												)}
											</Field>

											<Field name="bannerImgUrl">
												{({ field, form }: any) => (
													<FormControl mt={4}>
														<FormLabel>Upload School Banner</FormLabel>
														<FileBase
															{...field}
															type="image/*"
															multiple={false}
															onDone={({ base64 }: { base64: string }) =>
																setBanner({ ...banner, image: base64 })
															}
														/>
													</FormControl>
												)}
											</Field>

											<Flex direction="row" justify="end" mt={10}>
												<Button
													bg="#F4B95F"
													color="white"
													_hover={{ bg: "#DAA65D" }}
													mr={3}
													onClick={() => setTabIndex(2)}
												>
													Next
												</Button>
												<Button onClick={() => setTabIndex(0)}>Previous</Button>
											</Flex>
										</Form>
									</ModalBody>{" "}
								</TabPanel>
								<TabPanel>
									<ModalHeader textAlign="center">
										School Social Details
									</ModalHeader>
									<ModalBody pb={6}>
										<Form>
											<Field name="facebookUrl">
												{({ field, form }: any) => (
													<FormControl>
														<FormLabel>Facebook URL</FormLabel>
														<Input
															{...field}
															ref={initialRef}
															placeholder="https://facebook.com/"
															focusBorderColor="#F4B95F"
														/>
													</FormControl>
												)}
											</Field>

											<Field name="websiteUrl">
												{({ field, form }: any) => (
													<FormControl mt={4}>
														<FormLabel>Website URL</FormLabel>
														<Input
															{...field}
															placeholder="https://"
															focusBorderColor="#F4B95F"
														/>
													</FormControl>
												)}
											</Field>

											<Field name="instagramUrl">
												{({ field, form }: any) => (
													<FormControl mt={4}>
														<FormLabel>Instagram URL</FormLabel>
														<Input
															{...field}
															placeholder="https://instagram.com/"
															focusBorderColor="#F4B95F"
														/>
													</FormControl>
												)}
											</Field>

											<Field name="twitterUrl">
												{({ field, form }: any) => (
													<FormControl mt={4}>
														<FormLabel>Twitter URL</FormLabel>
														<Input
															{...field}
															placeholder="https://twitter.com/"															
															focusBorderColor="#F4B95F"
														/>
													</FormControl>
												)}
											</Field>

											<Field name="linkedinUrl">
												{({ field, form }: any) => (
													<FormControl mt={4}>
														<FormLabel>Linkedin URL</FormLabel>
														<Input
															{...field}
															placeholder="https://linkedin.com/in/"
															focusBorderColor="#F4B95F"
														/>
													</FormControl>
												)}
											</Field>

											<Flex direction="row" justify="end" mt={10}>
												<Button
													bg="#F4B95F"
													color="white"
													_hover={{ bg: "#DAA65D" }}
													mr={3}
													type="submit"
												>
													Update school
												</Button>
												<Button onClick={handleClose}>Cancel</Button>
											</Flex>
										</Form>
									</ModalBody>{" "}
								</TabPanel>
							</TabPanels>
						</Tabs>
					</ModalContent>
				</Modal>
			)}
		</Formik>
	);
};
