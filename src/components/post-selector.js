/**
 * Wordpress dependencies
 **/
import { useState, useEffect, useRef } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import { SelectControl } from "@wordpress/components";
import { Icon, close } from "@wordpress/icons";

/**
 * External dependencies
 **/
import tw from "tailwind-styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const DEFAULT_POST_TYPE = "post";
const EXCLUDED_POST_TYPES = [
	"attachment",
	"nav_menu_item",
	"wp_block",
	"wp_template",
	"wp_template_part",
	"wp_navigation",
	"wgg_preview",
];

const PostSelector = ({
	postType = false,
	items = [],
	saveData = () => {},
	saveReorder = () => {},
	handleRemove = () => {},
	max = 0,
	min = 0,
	queryArgs = {},
}) => {
	const [search, setSearch] = useState("");
	const [selectedPostType, setSelectedPostType] = useState(postType);
	const [scrollPosition, setScrollPosition] = useState(0);
	const [loadError, setLoadError] = useState(null);
	const scrollRef = useRef(null);

	const selectedPosts = items;

	const { posts, postTypes } = useSelect(
		(select) => {
			if (!postType) {
				setSelectedPostType(DEFAULT_POST_TYPE);
				const posts = select("core").getEntityRecords(
					"postType",
					DEFAULT_POST_TYPE,
					{
						...queryArgs,
						per_page: -1,
					}
				);
				const postTypes = select("core").getPostTypes({
					per_page: -1,
				});
				return {
					posts,
					postTypes,
				};
			}

			return {
				posts: select("core").getEntityRecords("postType", selectedPostType, {
					...queryArgs,
					per_page: -1,
				}),
				postTypes: select("core").getPostTypes({
					per_page: -1,
				}),
			};
		},
		[selectedPostType]
	);

	const isLoading = useSelect(
		(select) => {
			return (
				select("core/data").isResolving("core", "getEntityRecords", [
					"postType",
					selectedPostType,
				]) || select("core/data").isResolving("core", "getPostTypes")
			);
		},
		[selectedPostType]
	);

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollPosition;
		}
	}, [selectedPosts]);

	const handleDrop = (droppedItem) => {
		if (!droppedItem.destination) return;
		let updatedList = [...selectedPosts];
		const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
		updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
		saveReorder(updatedList);
	};

	if (isLoading) {
		return <h3>Loading...</h3>;
	}

	const renderPosts = () => {
		if (loadError) {
			return <h3>{loadError}</h3>;
		}

		if (!posts) {
			return <h3>No posts found</h3>;
		}

		if (posts.length === 0) {
			return <h3>No posts found</h3>;
		}

		return posts
			.filter((post) => {
				return post.title.rendered.toLowerCase().includes(search.toLowerCase());
			})
			.map((post) => {
				const isSelected = selectedPosts.find(
					(selectedPost) => selectedPost.id === post.id
				);
				const { title } = post;
				const Tag = isSelected ? ListItemSelected : ListItem;
				return (
					<Tag
						key={post.id}
						onClick={() => {
							if (isSelected) return;
							setScrollPosition(scrollRef.current.scrollTop);
							if (max > 0 && selectedPosts.length >= max) {
								alert(
									"You have reached the maximum number of items allowed for this field. Please remove an item before adding another."
								);
								return;
							}
							console.log(post);
							saveData(post);
						}}
					>
						{title.rendered || "(No title)"}
					</Tag>
				);
			});
	};

	return (
		<Wrapper>
			<Container>
				<FilterGrid>
					<SearchInput
						type="text"
						placeholder="Search"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						style={{
							border: 0,
							borderRadius: 0,
						}}
					/>
					{postTypes && (
						<div className="custom-select">
							<PostTypeSelect
								value={selectedPostType}
								onChange={(item) => {
									setSelectedPostType(item);
								}}
								style={{
									borderRadius: 0,
								}}
							>
								{postTypes
									.filter((type) => !EXCLUDED_POST_TYPES.includes(type.slug))
									.map((type) => (
										<option key={type.slug} value={type.slug}>
											{type.labels.singular_name}
										</option>
									))}
							</PostTypeSelect>
						</div>
					)}
				</FilterGrid>
				<PostsGrid>
					<Choices>
						<List
							ref={scrollRef}
							onScroll={() => {
								if (
									scrollRef.current.scrollTop +
										scrollRef.current.clientHeight ===
									scrollRef.current.scrollHeight
								) {
									loadMorePosts();
								}
							}}
						>
							{loadError && <Error>Error: {loadError.message}</Error>}
							{posts && renderPosts()}
						</List>
					</Choices>
					<SelectedPosts>
						<DragDropContext onDragEnd={handleDrop}>
							<Droppable droppableId="list-container">
								{(provided) => (
									<div
										className="list-container"
										{...provided.droppableProps}
										ref={provided.innerRef}
									>
										{selectedPosts.map((post, index) => {
											const { title } = post;
											return (
												<Draggable
													key={post.id.toString()}
													draggableId={post.id.toString()}
													index={index}
												>
													{(provided) => (
														<SelectedItem
															ref={provided.innerRef}
															{...provided.dragHandleProps}
															{...provided.draggableProps}
														>
															<div className="flex gap-4 justify-between">
																<div className="text-[13px] p-[5px] leading-5 hover:bg-[#3875d7] hover:text-white hover:cursor-pointer flex gap-2 ">
																	<span className="block">
																		{title.rendered}
																	</span>
																</div>
																<div className="selected-controls flex fill-white">
																	<RemoveButton
																		onClick={() => handleRemove(post.id)}
																	>
																		<Icon icon={close} />
																	</RemoveButton>
																</div>
															</div>
														</SelectedItem>
													)}
												</Draggable>
											);
										})}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
						</DragDropContext>
					</SelectedPosts>
				</PostsGrid>
			</Container>
		</Wrapper>
	);
};

const Wrapper = tw.div`py-8 max-w-full`;

const Container = tw.div`border w-[1200px] max-w-full bg-white`;

const FilterGrid = tw.div`border-b grid grid-cols-2`;

const PostsGrid = tw.div`grid grid-cols-2`;

const Choices = tw.div`bg-[#f9f9f9] border-r border-[#dfdfdf] p-1 h-[240px] overflow-auto`;

const SelectedPosts = tw.div`p-1 h-[240px] overflow-auto`;

const Error = tw.div`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative`;

const RemoveButton = tw.button`remove-btn hidden group-hover:flex bg-black text-white rounded-full w-[22px] h-[22px] justify-center items-center hover:opacity-80`;

const SelectedItem = tw.div`hover:bg-[#3875d7] hover:text-white group`;

const SearchInput = tw.input`p-2 w-full outline-none border-0`;

const ListItem = tw.li`text-[13px] p-[5px] leading-5 hover:bg-[#3875d7] hover:text-white hover:cursor-pointer`;

const ListItemSelected = tw.li`text-[13px] p-[5px] leading-5 text-gray-400`;

const List = tw.ul`list-none m-0 p-0`;

const PostTypeSelect = tw(SelectControl)`h-full flex-1`;

export default PostSelector;
