<?php

register_block_type(
	TKTK_BLOCKS_BUILD . 'post-list',
	array(
		'render_callback' => 'tktk_post_list_render_callback',
	)
);

function tktk_post_list_render_callback( $attributes, $content, $block_instance ) {
	// get post type from attributes
	$post_type = $attributes['postType'];

	$posts = get_posts(
		array(
			'posts_per_page' => 6,
			'post_type'      => $post_type,
			'orderby'        => 'date',
			'order'          => 'DESC',
		)
	);

	// get title, featured image, and post type plural name
	$post_items = array_map(
		function( $post ) {
			$post_type = get_post_type_object( $post->post_type );

			return array(
				'title'          => $post->post_title,
				'featured_image' => get_the_post_thumbnail_url( $post->ID, 'large' ),
				'post_type'      => $post_type->labels->name,
			);
		},
		$posts
	);

	// output html
	ob_start();
	?>

	<div class="tktk-post-list">
		<?php foreach ( $post_items as $post_item ) : ?>
			<div class="tktk-post-list__item">
				<div class="tktk-post-list__item-image <?php echo $post_item['featured_image'] ? '' : 'tktk-post-list__item-image--no-image'; ?>
				">
					<?php if ( $post_item['featured_image'] ) : ?>
						<img src="<?php echo esc_url( $post_item['featured_image'] ); ?>" alt="<?php echo esc_attr( $post_item['title'] ); ?>">
					<?php endif; ?>
				</div>
				<div class="tktk-post-list__item-content">
				<p class="tktk-post-list__item-type"><?php echo esc_html( $post_item['post_type'] ); ?></p>
					<h3 class="tktk-post-list__item-title"><?php echo esc_html( $post_item['title'] ); ?></h3>
				</div>
			</div>
		<?php endforeach; ?>
	</div>

	<?php
	return ob_get_clean();
}
