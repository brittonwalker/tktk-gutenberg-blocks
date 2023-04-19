<?php
/**
 * Plugin Name:       TKTK Blocks
 * Description:       A custom blocks starter with tailwind and helper components for your next project.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Britton Walker
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       tktk-blocks
 *
 * @package           tktk
 */

function tktk_blocks_init() {

	define('TKTK_BLOCKS_BUILD', plugin_dir_path( __FILE__ ) . 'build/blocks/');

	$blocks = array(
		'example',
	);

	$dynamic_blocks = array(
		'post-list',
	);

	foreach ( $blocks as $block ) {
		register_block_type( __DIR__ . '/build/blocks/' . $block );
	}

	foreach ( $dynamic_blocks as $block ) {
		include __DIR__ . '/src/blocks/' . $block . '/index.php';
	}

	add_filter( 'block_categories_all' , function( $categories ) {
		$categories[] = array(
			'slug'	=> 'tktk-blocks',
				'title' => 'TKTK Blocks',
		);

		return $categories;
	});

	// Enqueue editor stylesheet
	add_action( 'enqueue_block_editor_assets', function() {
		wp_enqueue_style( 'tktk-blocks-editor', plugins_url( 'build/tktkStyles.css', __FILE__ ), array(), filemtime( plugin_dir_path( __FILE__ ) . 'build/tktkStyles.css' ) );
	});
}

define('TKTK_BLOCKS', 'tktk-blocks/');

require __DIR__ . '/inc/api-routes.php';
