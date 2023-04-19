/**
 * WordPress dependencies
 */
import { InnerBlocks } from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import "./style.scss";
import json from "./block.json";
import Edit from "./edit";

const { name } = json;

registerBlockType(name, {
	edit: Edit,
});
