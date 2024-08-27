<?php
$notFoundPageId = pll_current_language() == 'fr' ? 717 : 706;
$permalink = get_permalink($notFoundPageId);
header("HTTP/1.1 301 Moved Permanently");
header("Location: " . $permalink);
exit();