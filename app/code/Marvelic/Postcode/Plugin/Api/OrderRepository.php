<?php

namespace Marvelic\Postcode\Plugin\Api;

use Magento\Sales\Api\Data\OrderExtensionFactory;
use Magento\Sales\Api\Data\OrderInterface;
use Magento\Sales\Api\Data\OrderSearchResultInterface;
use Magento\Sales\Api\OrderRepositoryInterface;


class OrderRepository
{

    const DELIVERY_TYPE = 'district';

    /**
     * Order Extension Attributes Factory
     *
     * @var OrderExtensionFactory
     */
    protected $extensionFactory;

    /**
     * OrderRepositoryPlugin constructor
     *
     * @param OrderExtensionFactory $extensionFactory
     */
    public function __construct(OrderExtensionFactory $extensionFactory)
    {
        $this->extensionFactory = $extensionFactory;
    }

    /**
     * Add "delivery_type" extension attribute to order data object to make it accessible in API data
     *
     * @param OrderRepositoryInterface $subject
     * @param OrderInterface $order
     *
     * @return OrderInterface
     */
    public function afterGet(\Magento\Sales\Api\OrderRepositoryInterface $subject, OrderInterface $order) {
        $extensionAttributes = $order->getExtensionAttributes();
        $extensionAttributes = $extensionAttributes ? $extensionAttributes : $this->extensionFactory->create();
        //$extensionAttributes->setDistrict($order->getShippingAddress()->getData('district'));
        $order->setExtensionAttributes($extensionAttributes);

        return $order;
    }

    /**
     * Add "delivery_type" extension attribute to order data object to make it accessible in API data
     *
     * @param OrderRepositoryInterface $subject
     * @param OrderSearchResultInterface $searchResult
     *
     * @return OrderSearchResultInterface
     */
    public function afterGetList(OrderRepositoryInterface $subject, OrderSearchResultInterface $searchResult)
    {
        $orders = $searchResult->getItems();

        foreach ($orders as &$order) {
            $extensionAttributes = $order->getExtensionAttributes();
            //$extensionAttributes = $extensionAttributes ? $extensionAttributes : $this->extensionFactory->create();

            if (!$extensionAttributes)
            {
                if ($order->getShippingAddress()->getData('district') != null)
                {
                    $extensionAttributes->setDistrict($order->getShippingAddress()->getData('district'));
                    $order->setExtensionAttributes($extensionAttributes);
                }
            }
        }

        return $searchResult;
    }
}