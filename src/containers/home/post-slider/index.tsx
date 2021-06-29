import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import PostSlideCard from "../../../components/post-slide-card/post-slide-card";
import PostSliderWrapper, { PrevButton, NextButton } from "./style";

SwiperCore.use([Autoplay, Navigation]);

const SimpleSwiper = () => {
	const Data = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					title
				}
			}
			allMarkdownRemark(
				sort: { fields: [frontmatter___date], order: DESC }
				filter: { frontmatter: { tags: { eq: "featured" } } }
			) {
				totalCount
				edges {
					node {
						excerpt(pruneLength: 190)
						fields {
							slug
							readingTime {
								text
							}
						}
						frontmatter {
							date(formatString: "MMM DD, YYYY")
							title
							description
							tags
							cover {
								childImageSharp {
									fluid(maxWidth: 870, maxHeight: 840, quality: 100) {
										...GatsbyImageSharpFluid
									}
								}
							}
						}
					}
				}
			}
		}
	`);
	const Posts = Data.allMarkdownRemark.edges;

	const params = {
		spaceBetween: 30,
		slidesPerView: 1,
		// autoplay: {
		// 	delay: 5000,
		// 	disableOnInteraction: false,
		// },
		navigation: {
			nextEl: ".ps-button-next",
			prevEl: ".ps-button-prev",
		},
	};

	return (
		<PostSliderWrapper>
			<Swiper {...params}>
				{Posts.map(({ node }: any) => (
					<SwiperSlide key={node.fields.slug}>
						<PostSlideCard
							title={node.frontmatter.title || node.fields.slug}
							image={
								node.frontmatter.cover == null
									? null
									: node.frontmatter.cover.childImageSharp.fluid
							}
							url={node.fields.slug}
							tags={node.frontmatter.tags}
							description={node.frontmatter.description || node.excerpt}
						/>
					</SwiperSlide>
				))}
				<NextButton className="ps-button-next" aria-label="next">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="10.545"
						viewBox="0 0 20 10.545"
					>
						<path
							id="right-arrow"
							d="M15.106,4.835a.532.532,0,1,0-.756.748l3.833,3.833H.536A.532.532,0,0,0,0,9.944a.539.539,0,0,0,.537.537H18.183L14.35,14.307a.543.543,0,0,0,0,.756.53.53,0,0,0,.756,0l4.74-4.74a.533.533,0,0,0,0-.748Z"
							transform="translate(0.001 -4.676)"
							fill="#fff"
						/>
					</svg>
				</NextButton>
				<PrevButton className="ps-button-prev" aria-label="prev">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="10.545"
						viewBox="0 0 20 10.545"
					>
						<path
							id="left-arrow"
							d="M4.892,4.835a.532.532,0,0,1,.756.748L1.816,9.415H19.462A.532.532,0,0,1,20,9.944a.539.539,0,0,1-.537.537H1.816l3.833,3.825a.543.543,0,0,1,0,.756.53.53,0,0,1-.756,0l-4.74-4.74a.533.533,0,0,1,0-.748Z"
							transform="translate(0.001 -4.676)"
							fill="#fff"
						/>
					</svg>
				</PrevButton>
			</Swiper>
		</PostSliderWrapper>
	);
};

export default SimpleSwiper;
