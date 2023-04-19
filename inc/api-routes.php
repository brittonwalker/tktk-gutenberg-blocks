<?php

add_action( 'rest_api_init', 'register_tktk_api' );

function register_tktk_api () {
	register_rest_route( 'tktk-blocks/v1', '/tktk', array(
		'methods' => 'GET',
		'callback' => 'get_tktk',
		'permission_callback' => '__return_true',
		// add an array of arguments to the route if needed, ex: offset, maxReturn
	) );
}

function get_tktk($args = array()) {
	// generate some fake data
	$posts = array();

	for ($i = 0; $i < 10; $i++) {
		$posts[] = array(
			'id' => $i,
			'title' => 'Post ' . $i,
			'content' => 'This is the content for post ' . $i,
		);
	}

	return new WP_REST_Response($posts, 200);
}

add_action( 'init', 'tktk_blocks_init' );
