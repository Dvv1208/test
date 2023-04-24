<?php
namespace Marvelic\Postcode\Plugin\Checkout\Block\Checkout\AttributeMerger;

class Plugin
{
  public function afterMerge(\Magento\Checkout\Block\Checkout\AttributeMerger $subject, $result)
  {
    if (array_key_exists('street', $result)) {
      $result['street']['children'][0]['placeholder'] = __('House No., Unit/Floor, Building, Street Name');
      
    }

    return $result;
  }
}