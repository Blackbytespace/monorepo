<?php

// namespace Components\Card;


$link = new \Lotsof\Types\LinkType(text: 'EFEFEF');
$button = new \Lotsof\Types\ButtonType(link: $link);

$button = \Lotsof\Types\ButtonType::mock();

$image = new \Lotsof\Types\ImageType(src: 'https://picsum.photos/200/300');
$body = new \Lotsof\Types\BodyType(title: 'Hello', lead: 'World', buttons: [$button]);
$body = \Lotsof\Types\BodyType::mock();
$card = new \Components\Card\Card($body, $image);


print \Components\Renderer\render('card.card', $card->toObject());


