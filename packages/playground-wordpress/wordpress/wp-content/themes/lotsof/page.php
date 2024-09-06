<?php get_header(); ?>

<main class="layout-main">

	<?php

	require __DIR__ . '/src/components/card/card.php';
	require __DIR__ . '/src/components/typo/typo.php';

	?>

	<?php while (have_posts()):
		the_post(); ?>
		<?php the_content(); ?>
	<?php endwhile; ?>

</main>

<?php get_footer(); ?>